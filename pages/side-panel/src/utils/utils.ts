import { SolutionStatus, IdeaStatus, RequestStatus, IdeaPriority, RequestPriority } from '../types/types';

export const dateToUIString = (date: Date) => {
  return new Date(date).toUTCString();
};

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, '0');
};

export const getDateString = (date: Date) => {
  return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
};

export const capitalizeFirstLetters = (str: string) => {
  //from https://flexiple.com/javascript-capitalize-first-letter/
  const arr = str.split(' ');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(' ');
};

export const stripHtml = (html: string) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export const getDisplaySolutionStatus = (status: string) => {
  return SolutionStatus[status] ? SolutionStatus[status] : SolutionStatus.new;
};

export const getDisplayIdeaStatus = (status: string) => {
  return IdeaStatus[status] ? IdeaStatus[status] : IdeaStatus.unprocessed;
};

export const getDisplayRequestStatus = (status: string) => {
  return RequestStatus[status] ? RequestStatus[status] : RequestStatus.new;
};

export const getDisplayIdeaPriority = (priority: string) => {
  return IdeaPriority[priority] ? IdeaPriority[priority] : 'Unknown';
};

export const getDisplayRequestPriority = (status: string) => {
  return RequestPriority[status] ? RequestPriority[status] : 'Unknown';
};

export const getSelectOptionsFromType = (type: any) => {
  return Object.keys(type).map(key => ({ value: key, label: type[key] }));
};

export const getConnectedUserRole = (auth0: any) => {
  return auth0.user ? auth0.user['bagel/role'] : 'viewer';
};

export const getConnectedUserEmail = (auth0: any) => {
  return auth0.user ? auth0.user.email : undefined;
};

export const getBagelId = (auth0User: any) => {
  return auth0User['bagel/bagelId'];
};

const evidenceIcons: any = {
  conversation: '/evidence/Case.png',
  opportunity: '/evidence/Opportunity.png',
  call: '/evidence/Call.png',
  account: '/evidence/Account.png',
  user: '/evidence/User.png',
  member: '/evidence/Member.png',
};

export const getEvidenceIconByType = (type: string) => {
  return evidenceIcons[type] ? evidenceIcons[type] : undefined;
};
