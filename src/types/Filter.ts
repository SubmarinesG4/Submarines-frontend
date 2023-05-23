interface Filter {
  phrase: string;
  date: Date | null;
  published: "all" | "true" | "false";
}

export type { Filter };
