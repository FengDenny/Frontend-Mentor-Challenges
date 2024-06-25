import { fetchDataLogic } from "./FetchData";
import { listingsFilteredLogic } from "./ListingFiltered";
import { createElementsHelpers } from "./CreateElementsHelpers";

export const listingsLogic = {
  listings: "./data/data.json",
  async fetchListings() {
    try {
      const listingData = await fetchDataLogic.FetchData(this.listings);
      return listingData;
    } catch (error) {
      console.error(`Error fetching listing data: ${error}`);
    }
  },
  async fetchListingDataModified() {
    const listingData = await this.fetchListings();

    const modified = listingData.map((item) => {
      // Check if location is "USA / UK  Only", then modify to "USA / UK only"
      if (item.location.includes("Only")) {
        item.location = item.location.replace("Only", "only");
      }
      return item;
    });
    return modified;
  },
};

export const listingsUI = {
  main: document.getElementById("job-listings"),

  createListingCards(job) {
    const cardListingContent = this.createListingCardContent(job);
    const cardListingFilterCTA = this.createListingFilterCTA(job);
    const { featured, new: isNew, logo, company } = job;
    const article = this.createArticle(featured && isNew, isNew);
    const figure = this.createFigureWithImage(logo, company);
    article.appendChild(figure);
    article.appendChild(cardListingContent);
    article.appendChild(cardListingFilterCTA);
    this.main.appendChild(article);
  },
  createListingCardContent(job) {
    const {
      featured,
      new: isNew,
      company,
      position,
      postedAt,
      contract,
      location,
    } = job;
    const listingContentDiv = createElementsHelpers.createDiv({
      class: "listing-content",
    });

    // Create header
    const header = createElementsHelpers.createHeader({
      class: "listing-header",
    });
    const headingH2 = createElementsHelpers.createHeadingH2({}, company);
    const spanDataNew = createElementsHelpers.createSpan(
      { class: "new-listing" },
      `New!`
    );
    const spanDataFeatured = createElementsHelpers.createSpan(
      { class: "new-featured" },
      `Featured`
    );
    header.appendChild(headingH2);
    if (isNew && featured) {
      header.appendChild(spanDataNew);
      header.appendChild(spanDataFeatured);
    } else if (isNew) {
      header.appendChild(spanDataNew);
    }

    // Create job section
    const jobDiv = createElementsHelpers.createDiv({ class: "job" });
    const jobTitle = createElementsHelpers.createHeadingH2({}, position);

    const jobDescriptionDiv = createElementsHelpers.createDiv({
      class: "job-description",
    });
    const jobPosted = createElementsHelpers.createSpan(
      { "data-postedAt": postedAt, class: "job-posted" },
      postedAt
    );
    const jobContract = createElementsHelpers.createSpan(
      { "data-contract": contract, class: "job-contract" },
      contract
    );
    const jobLocation = createElementsHelpers.createSpan(
      { "data-location": location, class: "job-location" },
      location
    );

    jobDescriptionDiv.appendChild(jobPosted);
    jobDescriptionDiv.appendChild(jobContract);
    jobDescriptionDiv.appendChild(jobLocation);

    jobDiv.appendChild(jobTitle);
    jobDiv.appendChild(jobDescriptionDiv);

    listingContentDiv.appendChild(header);
    listingContentDiv.appendChild(jobDiv);
    return listingContentDiv;
  },
  createListingFilterCTA(job) {
    const { role, level, tools, languages } = job;
    const listingFilterCTADiv = createElementsHelpers.createDiv({
      class: "listings-filters",
      ["data-filters"]: "listings-filters",
    });
    const filterByRoleCTA = createElementsHelpers.createCTA(
      {
        ["aria-label"]: `Filter by ${role} role`,
        ["data-role"]: role,
      },
      role
    );
    const filterByLevelCTA = createElementsHelpers.createCTA(
      {
        ["aria-label"]: `Filter by ${level} level`,
        ["data-level"]: level,
      },
      level
    );
    let filterByToolCTA = null;
    let filterByLanguageCTA = null;

    listingFilterCTADiv.appendChild(filterByRoleCTA);
    listingFilterCTADiv.appendChild(filterByLevelCTA);

    if (tools) {
      tools.forEach((tool) => {
        filterByToolCTA = createElementsHelpers.createCTA(
          {
            ["aria-label"]: `Filter by ${tool} tool`,
            ["data-tool"]: tool,
          },
          tool
        );
        listingFilterCTADiv.appendChild(filterByToolCTA);
      });
    }
    
    if (languages) {
      languages.forEach((language) => {
        filterByLanguageCTA = createElementsHelpers.createCTA(
          {
            ["aria-label"]: `Filter by ${language} language`,
            ["data-language"]: language,
          },
          language
        );
        listingFilterCTADiv.appendChild(filterByLanguageCTA);
      });
    }
    
    return listingFilterCTADiv;
  },

  createArticle(isNewFeatured = false, isNew = false) {
    let createArticle = null;
    if (isNewFeatured) {
      createArticle = createElementsHelpers.createArticle({
        ["data-id"]: "listing-card",
        ["data-new-featured"]: "true",
      });
    } else if (isNew) {
      createArticle = createElementsHelpers.createArticle({
        ["data-id"]: "listing-card",
        ["data-new"]: "true",
      });
    } else {
      createArticle = createElementsHelpers.createArticle({
        ["data-id"]: "listing-card",
      });
    }

    return createArticle;
  },
  createFigureWithImage(src, alt) {
    const createFigure = createElementsHelpers.createFigure({
      class: "listing-logo",
    });

    const createImg = createElementsHelpers.createImg({
      src,
      alt,
    });

    createFigure.appendChild(createImg);
    return createFigure;
  },
};

const initListings = {
  data: listingsLogic.fetchListingDataModified(),
  async init() {
    const dataModified = await this.data;
    listingsFilteredLogic.fetchListingsHTMLDataAndFilter(dataModified);
  },
};

initListings.init();
