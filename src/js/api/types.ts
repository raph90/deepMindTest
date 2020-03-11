type AgentId = number;
interface Agent {
  readonly id: AgentId;
  readonly name: string;
  readonly description: string;
  readonly tasks: Task[];
}
interface Task {
readonly id: string;
readonly name: string;
readonly category: 'memory'|'planning'|'logic'; readonly score: number;
}

