
import { Model } from "../model/Model";
import View from "../view/View";
import { debounce } from "../utilities/debounce";

class Controller {
  // our model sources the data from the api
  model: Model;
  // currentlySelected determines the pages selected
  currentlySelected: string[] = [];

  constructor() {
    this.model = new Model();
  }

  initalise() {
    // call in all agents
    this.fetchAllAgents()
 

    View.nodes.sidebarNav.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("page")) {
        // if the page is selected, de-select it.
        if (this.currentlySelected.includes(target.id)) {
          this.currentlySelected = this.currentlySelected.filter(
            item => item !== target.id
          );
          target.classList.remove("selected");
        } else {
          // if we have more than two pages showing we get rid of the most recent
          if (this.currentlySelected.length >= 2) {
            const toRemove = this.currentlySelected.pop();
            document.getElementById(toRemove).classList.remove("selected");
          }
          target.classList.add("selected");
          this.currentlySelected.push(target.id);
        }
        // show selected pages
        View.displayPages(this.currentlySelected);
      }
    });

    // if we click on the search bar it resets 
    View.nodes.search.addEventListener("click", e => {
        let target = e.target as HTMLInputElement
        if (target.value.length > 0){
            target.value = ""
            this.resetSelected()
            this.fetchAllAgents()
        }
        
    })

    // search is debounced by 500ms to prevent loads of API calls
    View.nodes.search.addEventListener("input", debounce(async (e: Event) => {
        let target = e.target as HTMLInputElement
        if (target.value.length >= 1){
            this.resetSelected()
            this.updateLoading(true)
            const searchedAgents = await this.model.searchForAgent(target.value)
            this.updateLoading(false)
            this.loadAgents(searchedAgents)
        } else if (target.value.length === 0){
            this.fetchAllAgents()
        }
        
      }, 500))

}

    // call all agents from the model
  async fetchAllAgents(){
    this.updateLoading(true);
    const allAgents = await this.model.loadInData();
    this.updateLoading(false);
    this.loadAgents(allAgents)
  }

  // load agents to the view
  async loadAgents(agents: ReadonlyArray<Agent>) {
    if (agents) {
      View.populate(agents);
    } else {
        // show error
      View.displayLoadingError()
    }
  }



  // show loader
  updateLoading(loadingState: boolean): void {
    View.displaySidebarLoading(loadingState);
  }
  // reset all selected pages 
  resetSelected(){
      this.currentlySelected = []
      View.deselectAllPages()
      View.displayPages(this.currentlySelected)
  }
}

export default Controller;
