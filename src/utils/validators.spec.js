import { validateEmptyAndEmail, validateEmptyAndLength3 } from "./validators"

describe('Validators utils', () => {
  it('Should give an error with empty payload', () => {
    expect(validateEmptyAndLength3()).toBe('*Este campo é obrigatório')
  })

  it('Should give an error with less than 3 character payload', () => {
    expect(validateEmptyAndLength3('12')).toBe('*Este campo precisa de no mínimo 3 caracteres')
  })

  it('Should return true when input is correct', () => {
    expect(validateEmptyAndLength3('123')).toBe(true)
  })

  it('Should give an error with empty payload', () => {
    expect(validateEmptyAndEmail()).toBe('*Este campo é obrigatório')
  })

  it('Should give an error when input is not an email', () => {
    expect(validateEmptyAndEmail('robertopontes.io')).toBe('*Este campo precisa ser um e-mail')
  })

  it('Should return true when email is correct', () => {
    expect(validateEmptyAndLength3('roberto@pontes.io')).toBe(true)
  })
})