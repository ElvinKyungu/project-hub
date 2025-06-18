type TaskState = "in-progress" | "review" | "completed";
type TaskType = "bug" | "feature" | "improvement";

export interface User {
  id: number;
  name: string;
  avatar: string;
  teams: number[]; // IDs des équipes
}

export interface Team {
  id: number;
  name: string;
  members: number[]; // IDs des users
}

export interface Task {
  id: string;
  name: string;
  state: TaskState;
  type: TaskType;
  tags: string[];
  component?: string;
  dueDate: string;
  assigneeId: number;
  iconLevelOpacity: {
    firstFillOpacity: string;
    secondFillOpacity: string;
    thirdFillOpacity: string;
  };
}
