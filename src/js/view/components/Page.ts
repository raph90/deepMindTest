



export class Page implements Agent {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
  html: string;

  constructor(agent: Agent) {
    this.id = agent.id;
    this.name = agent.name;
    this.description = agent.description;
    this.tasks = agent.tasks;
    this.html = this.constructHtml();
  }

  constructHtml() {
    return `
        <div>
        <h1 class="agent__heading">${this.name}</h1>
        </div>
        <p class="agent__description">${this.description}</p>
        <h2 class="agent__subheader">Tasks</h2>
        <table class="agent__table">
        <tr>
            <th class="col-id">ID</th>
            <th>name</th>
            <th>Category</th>
            <th>Score</th>
      </tr>
      ${this.constructTasks()}
        </table>
        `;
  }

  constructTasks(): string {
    let returnString: string = "";
    this.tasks.forEach(task => {
      returnString += `
            <tr>
              <td class="col-id">${task.id}</td>
              <td>${task.name}</td>
              <td>${task.category}</td>
              <td>${task.score}</td>
            </tr>
            `;
    });
    return returnString;
  }
}


export default Page;
