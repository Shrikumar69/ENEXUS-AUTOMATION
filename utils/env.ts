export type LoginCredentials = {
  username: string;
  password: string;
};

export function getLoginCredentials(): LoginCredentials | null {
  const username = process.env.ENEXUS_USERNAME?.trim();
  const password = process.env.ENEXUS_PASSWORD?.trim();

  if (!username || !password) {
    return null;
  }

  return { username, password };
}

export function getLoginUrl(): string {
  return (
    process.env.ENEXUS_LOGIN_URL ||
    'https://enexus-qa.epicor.com/ENexus/#/login?redirectUrl=%2Fhome'
  );
}
