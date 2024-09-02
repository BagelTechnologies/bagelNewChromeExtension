/* eslint-disable no-unused-vars */
export const SolutionStatus: any = {
  new: 'New',
  backlog: 'Backlog',
  planned: 'Planned',
  'in-progress': 'In Progress',
  beta: 'Beta',
  production: 'Production',
  canceled: 'Canceled',
};

export const IdeaStatus: any = {
  unprocessed: 'Unprocessed',
  backlog: 'Backlog',
  planned: 'Planned',
  'in-progress': 'In Progress',
  shipped: 'Shipped',
  canceled: 'Canceled',
};

export const RequestStatus: any = {
  validated: 'Validated',
  new: 'New',
  rejected: 'Rejected',
  'loop-closed': 'Loop Closed',
};

export const SolutionPriority: any = {
  urgent: 'Urgent',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const IdeaPriority: any = {
  urgent: 'Urgent',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const PriorityColors: any = {
  low: '#83EDAE',
  medium: '#FDAE16',
  high: '#F26786',
  urgent: '#FC0A0A',
};

export const RequestPriority: any = {
  'deal-breaker': 'Deal Breaker',
  important: 'Important',
  'nice-to-have': 'Nice To Have',
};

export enum UserTypes {
  ADMIN = 'admin',
  MANAGER = 'manager',
  AGENT = 'agent',
  CASUAL = 'casual',
}
