export function validateLogin(email: string, password: string): string | null {
  if (!email || !password) return 'Email et mot de passe requis.'
  if (!email.includes('@')) return 'Adresse email invalide.'
  if (password.length < 6) return 'Mot de passe trop court (min. 6 caractères).'
  return null
}

export function validateSignup(
  email: string,
  password: string,
  name: string,
  lastName: string
): string | null {
  if (!email || !password || !name || !lastName) return 'Tous les champs sont requis.'
  if (!email.includes('@')) return 'Adresse email invalide.'
  if (password.length < 6) return 'Mot de passe trop court (min. 6 caractères).'
  return null
}
