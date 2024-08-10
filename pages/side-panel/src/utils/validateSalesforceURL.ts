export function validateSalesforceURL(url: string): boolean {
  const salesforceDomains = [
    'https://[a-zA-Z0-9_\\-\\|?\\.develop]+\\.my\\.salesforce\\.com',
    'https://[a-zA-Z0-9_\\-\\|?\\.develop]+\\.content\\.force\\.com',
    'https://[a-zA-Z0-9_\\-\\|?\\.develop]+\\.salesforce\\.com',
    'https://[a-zA-Z0-9_\\-\\|?\\.develop]+\\.salesforceiq\\.com',
    'https://[a-zA-Z0-9_\\-\\|?\\.develop]+\\.lightning\\.force\\.com',
  ];
  const pattern = `^(${salesforceDomains.join('|')})$`;
  const regex = new RegExp(pattern);
  const trimmedDomain = url.substring(url.length - 1) === '/' ? url.substring(0, url.length - 1) : url;
  return regex.test(trimmedDomain);
}

export function extractSubdomain(url: string): string {
  let subdomain = url.toLowerCase().replace('https://', '').split('.')[0];
  if (url.indexOf('.develop') !== -1) {
    subdomain += '.develop';
  }
  return subdomain;
}
