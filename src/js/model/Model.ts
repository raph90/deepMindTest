import { AgentsApi } from "../api/AgentsApi";

export class Model {
  apiHandler: AgentsApi;

  agents: Agent[] = [];

  constructor() {
    this.apiHandler = new AgentsApi();
  }

  async loadInData(): Promise<ReadonlyArray<Agent>> {
    try {
      const data = await this.apiHandler.listAgents();
      // here I could have stored the agents in state, but chose not to because 
      // from the way the API was laid out it seemed that the task wanted me to use the searchAgents
      // method for querying.
      this.agents = [...data]
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async searchForAgent(searchQuery: string): Promise<ReadonlyArray<Agent>> {
    try {
      const found = await this.apiHandler.searchAgents(searchQuery);

      return found;
    } catch (err) {
      console.log(err);
    }
  }

  async fetchSpecificAgent(id: AgentId) {
    try {
      const found = await this.apiHandler.getAgent(id);
    } catch (err) {
      console.log(err);
    }
  }
}
