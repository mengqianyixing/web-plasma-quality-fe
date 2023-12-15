export type Cell = {
  field: string;
  label: string;
  format?: (state: any) => string | number;
  slot?: string;
};
