export interface Task {
  id: string
  title: string
  description: string | null
  status: 'Todo' | 'Backlog' | 'In progress' | 'Technical Review' | 'Paused' | 'Completed'
  type:
    | 'Feature'
    | 'Refactor'
    | 'Design'
    | 'Performance'
    | 'Documentation'
    | 'Accessibility'
    | 'Testing'
    | 'Security'
  priority: 'No priority' | 'Low' | 'Medium' | 'High' | 'Urgent'
  lead_id: string | null
  progress: number
  component_id: string | null
  target_date: string | null
  created_at: string
}
