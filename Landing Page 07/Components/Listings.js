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
    const container = createElementsHelpers.createDiv({
      class: "content-container",
    });
    container.appendChild(figure);
    container.appendChild(cardListingContent);
    article.appendChild(container);
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

  createTabletOrdering(job) {
    const filter = new Map();
    const { id, role, level, languages, tools } = job;
    filter.set("role", role);
    filter.set("level", level);

    const combined = new Array();

    // Helper function to toggle between languages and tools
    function alternateOrderingTablet(firstArray, secondArray, prioritizeTools) {
      // Handle cases where one array (languages || tools) is longer than the other.
      const maxLength = Math.max(
        firstArray?.length || 0,
        secondArray?.length || 0
      );
       /*
     Iterating up to the length of the longer array (maxLength), 
     the loop ensures that no items are missed, even if one array is shorter than the other.
     - IFF both arrays have items at the same index i
     - Depending on prioritizeTools flags, alternates between adding tool or language.
  */
      for (let i = 0; i < maxLength; i++) {
        if (firstArray && firstArray[i])
          combined.push({ [prioritizeTools ? "tool" : "language"]: firstArray[i] });
        if (secondArray && secondArray[i])
          combined.push({ [prioritizeTools ? "language" : "tool"]: secondArray[i] });
      }
    }

    if (id === 3 || id === 10) {
      // Special case for job with id 3, 10 (Account, The Air Filter Company)
      combined.push({ tool: tools[0] }); // React
      combined.push({ tool: tools[1] }); // Sass
      combined.push({ language: languages[0] }); // JavaScript
    } else if (id === 8) {
      // Special case for job with id 3, 10 (Insure)
      // Vue, JavaScript, Sass
      alternateOrderingTablet(tools, languages, true);
    } else {
      // General case
      alternateOrderingTablet(languages, tools, false);
    }

    filter.set("combined", combined);
    return filter;
  },
  createListingFilterCTA(job) {
    const filter = this.createTabletOrdering(job);
    const listingFilterCTADiv = createElementsHelpers.createDiv({
      class: "listings-filters",
      ["data-filters"]: "listings-filters",
    });

    // Create CTA for role
    const role = filter.get("role");
    const filterByRoleCTA = createElementsHelpers.createCTA(
      {
        ["aria-label"]: `Filter by ${role} role`,
        ["data-role"]: role,
      },
      role
    );
    listingFilterCTADiv.appendChild(filterByRoleCTA);

    // Create CTA for level
    const level = filter.get("level");
    const filterByLevelCTA = createElementsHelpers.createCTA(
      {
        ["aria-label"]: `Filter by ${level} level`,
        ["data-level"]: level,
      },
      level
    );
    listingFilterCTADiv.appendChild(filterByLevelCTA);

    // Create CTA for combined languages and tools
    const combined = filter.get("combined");
    combined.forEach((item) => {
      if (item.language) {
        const filterByLanguageCTA = createElementsHelpers.createCTA(
          {
            ["aria-label"]: `Filter by ${item.language} language`,
            ["data-language"]: item.language,
          },
          item.language
        );
        listingFilterCTADiv.appendChild(filterByLanguageCTA);
      }
      if (item.tool) {
        const filterByToolCTA = createElementsHelpers.createCTA(
          {
            ["aria-label"]: `Filter by ${item.tool} tool`,
            ["data-tool"]: item.tool,
          },
          item.tool
        );
        listingFilterCTADiv.appendChild(filterByToolCTA);
      }
    });

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
