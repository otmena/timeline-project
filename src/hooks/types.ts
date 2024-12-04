export type EventData = {
  date: string;
  description: string;
};

export type PointData = {
  label: string;
  year: number;
  index: number;
  events: EventData[];
};