import { useFormik } from 'formik'

interface CustomerForm {
  firstName: string
  lastName: string
}

const validate = (values: CustomerForm): Record<string, string> => {
  const errors: Record<string, string> = {}

  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length > 50) {
    errors.firstName = 'Must be 50 characters or less'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  } else if (values.lastName.length > 50) {
    errors.lastName = 'Must be 50 characters or less'
  }

  return errors
}

export default function App() {
  const formik = useFormik<CustomerForm>({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2))
    },
  })

  return (
    <div className="container mx-auto max-w-3xl">
      <div>
        <header className={'py-2'}>
          <h1 className="text-3xl font-bold">New Customer</h1>
        </header>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex space-x-4">
            <div className="form-control flex-1">
              <label
                htmlFor="firstName"
                className="label"
              >
                First Name
              </label>
              <input
                type="text"
                className="input input-sm input-bordered"
                id="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className="form-control flex-1">
              <label
                htmlFor="lastName"
                className="label"
              >
                Last Name
              </label>
              <input
                type="text"
                className="input input-sm input-bordered"
                id="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              {formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
