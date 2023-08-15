module.exports = async (profileName, userRepository) => {
  const formattedProfileName = profileName.toLowerCase().replace(/\s+/g, '')
  const randomDigits = Math.floor(Math.random() * 9000) + 1000
  let usernameCandidate = `${formattedProfileName}${randomDigits}`
  let counter = 1

  while (await userRepository.checkUsernameExists(usernameCandidate)) {
    usernameCandidate = `${formattedProfileName}${randomDigits}${counter}`
    counter++
  }
  return usernameCandidate
}
