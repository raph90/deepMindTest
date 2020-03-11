import Page from "./Page";

class ComparisonPage {
  static constructComparisonPage(agents: Page[]): string {
    const categories = this.findCategories(agents);
    const agent1Scores = this.buildCategoryScores(agents[0], categories);
    const agent2Scores = this.buildCategoryScores(agents[1], categories);

    let table = this.buildTable(agents[0].name, agents[1].name);
    categories.forEach(category => {
      table += this.createCategoryRow(
        category,
        agent1Scores[category],
        agent2Scores[category]
      );
    });
    table += "</table>";

    return table;
  }

  private static buildTable(name1: string, name2: string) {
    return `
      <h1 class="comparison__title"> Comparison of ${name1} and ${name2}</h1>
        <table class="comparison__table">
        <tr>
            <th>Category</th>
            <th>${name1}</th>
            <th>${name2}</th>
        </tr>
    `;
  }

  private static createCategoryRow(
    cat: string,
    ag1Score: number,
    ag2Score: number
  ): string {
    return `
      <tr>
            <td>${cat}</td>
            <td class="${ag1Score > ag2Score ? "larger" : "smaller"}">${ag1Score}</td>
            <td class="${ag2Score > ag1Score ? "larger" : "smaller"}">${ag2Score}</td>
        </tr>
    `;
  }

  private static findCategories(agents: Page[]): string[] {
    let comparableCategories: string[] = [];
    agents.forEach(agent => {
      agent.tasks.forEach(task => {
        if (!comparableCategories.includes(task.category)) {
          comparableCategories.push(task.category);
        }
      });
    });
    return comparableCategories;
  }

  private static buildCategoryScores(
    agent: Page,
    categories: string[]
  ): { [key: string]: number } {
    const scores: { [key: string]: number } = {};
    categories.forEach(category => {
      scores[category] = 0;
    });

    agent.tasks.forEach(task => {
      scores[task.category] += task.score;
    });

    return scores;
  }
}

export default ComparisonPage;
