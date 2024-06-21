export interface TodoModel{
  id: number;
  title:string;
  completed: boolean;
  editing? : boolean;
}

export type FilterType = 'all' | 'active' | 'completed';
