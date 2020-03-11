



class NavItem {
    id: number;
    name: string;
    html: string;

    constructor(agent: Agent){
        this.id = agent.id
        this.name = agent.name
        this.html = this.constructHtml()
    }

    constructHtml(): string {
        return (
            `   
            <div class="nav__item page" id="/${this.id}">
              <div class="nav__item__titles">
                <h1>${this.name}</h1>
              </div>
            </div>
            `
        )
    }

}

export default NavItem