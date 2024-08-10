const getRequestSubmitterName = (item: any) => {
  const submitter = item.internalSubmitter || item.cxSubmitter || item.submitter;
  return submitter ? submitter.name || submitter.displayName : item.submitterEmail;
};

export default getRequestSubmitterName;
