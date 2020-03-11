import NavItem from "./components/NavItem";
import ComparisonPage from "./components/ComparisonPage";
import Page from "./components/Page";


class View {
  static nodes = {
    contentContainer: document.querySelector(".content"),
    comparisonArea: document.querySelector(".comparison"),
    pageArea: document.querySelector(".agent-container"),
    navButtons: document.querySelectorAll(".nav"),
    sidebarNav: document.querySelector(".sidebar__nav"),
    loaders: document.querySelectorAll(".loader"),
    navList: document.querySelector(".nav"),
    search: document.querySelector("#search"),
    home: document.querySelector(".home"),
    noFound: document.querySelector('.no-found')
  };

  private static pages: any = {};

  /*
    Determines what we need to show. 
    The appendPage method does the actual rendering to screen
  */
  static displayPages(selectedPages: string[]) {
    this.nodes.pageArea.innerHTML = "";
    if (!selectedPages.length) {
      this.nodes.comparisonArea.classList.add("hide");
      this.nodes.home.textContent = "Please select an agent";
      this.hideHome(false);
    } else {
      this.hideHome(true);
      if (selectedPages.length === 1) {
        console.log("yees")
        this.removeComparisonPage();
      } else {
        this.appendComparisonPage(selectedPages);
      }
    }

    selectedPages.forEach(page => {
      this.appendPage(page);
    });
  }

  // if we have a server error we remove all sidebar items, 
  // and update the text in the center of the screen
  static displayLoadingError() {
    const pages = document.getElementsByClassName("page");
    while (pages[0]) {
      pages[0].parentNode.removeChild(pages[0]);
    }
    this.nodes.noFound.classList.remove("hide")
    this.nodes.home.textContent =
      "Unfortunately there was an error retrieving data from the server; please reload your page.";
  }

  // what we show when there's no content on screen
  static hideHome(doIhide: boolean) {
    if (doIhide) {
      this.nodes.home.classList.add("hide");
    } else {
      this.nodes.home.classList.remove("hide");
    }
  }

  // deselect sidebar items
  static deselectAllPages() {
    const pages = document.querySelectorAll(".page");
    pages.forEach(page => {
      page.classList.remove("selected");
    });
  }

  // remove the comparison
  static removeComparisonPage() {
    this.nodes.comparisonArea.classList.add("hide");
  }

  // append the comparison
  static appendComparisonPage(selectedPages: string[]) {
    const pages = selectedPages.map(id => this.pages[id]);
    this.nodes.comparisonArea.classList.remove("hide");
    this.nodes.comparisonArea.innerHTML = ComparisonPage.constructComparisonPage(
      pages
    );
  }

  // append page 
  static appendPage(pageId: string) {
    const page = this.pages[pageId];
    const newDiv = document.createElement("div");
    newDiv.className = "agent";
    newDiv.innerHTML = page.html;
    this.nodes.pageArea.appendChild(newDiv);
  }

  static populate(agents: ReadonlyArray<Agent> | null) {
    if (agents) {
      // remove pages first
      const pagesThere = this.nodes.navList.getElementsByClassName("page");
      while (pagesThere[0]) {
        pagesThere[0].parentNode.removeChild(pagesThere[0]);
      }
      // populate the sidebar
      this.populateSidebar(agents);
      // create the pages
      this.populatePages(agents);
    }
  }

  // adds to the pages object
  static populatePages(agents: ReadonlyArray<Agent>) {
    agents.forEach(agent => {
      this.pages[`/${agent.id}`] = new Page(agent);
    });
  }

  static populateSidebar(agents: ReadonlyArray<Agent>) {
    if (agents.length) {
      this.nodes.noFound.classList.add('hide')
      agents.forEach(agent => {
        const navItem = new NavItem(agent);
        const newElement = document.createElement("div");
        newElement.innerHTML = navItem.html;
        this.nodes.navList.appendChild(newElement);
      });
    }
  }

  static displaySidebarLoading(weAreLoading: boolean): void {
    if (weAreLoading) {
      this.hideHome(true);
      this.nodes.loaders.forEach(el => el.classList.remove("hide"));
    } else {
      this.hideHome(false);
      this.nodes.loaders.forEach(el => el.classList.add("hide"));
    }
  }
}

export default View;
