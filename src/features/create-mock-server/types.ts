export interface CreateServerFormValues {
  name: string;
  standCode: string;
}

export interface CreateServerFormErrors {
  name?: string;
  standCode?: string;
}

export interface StandOption {
  value: string;
  label: string;
}
