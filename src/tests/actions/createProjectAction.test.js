import moxios from 'moxios'
import { createProject } from '../../actions/createProjectAction'

describe('createProject', () => {
  const props = {
    title: 'PairProgramming Rocks',
    description: 'Project all about pair programming',
    status: 'active',
    cookies: { get: jest.fn() }
  }
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it('returns with a status 200 if a project is created successfully', async () => {
    expect.assertions(1)
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve({ status: 200 })
    })
    await expect(createProject(props)).resolves.toEqual({ status: 200 })
  })
})
