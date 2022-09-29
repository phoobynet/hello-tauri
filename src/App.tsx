import FormControl from './components/FormControl'
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

function InputError(props: { error?: string }) {
  return props.error ? (
    <div className={'text-sm text-red-400'}>{props.error}</div>
  ) : null
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
            <FormControl
              label={'First Name'}
              id={'firstName'}
              type={'text'}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              error={formik.errors.firstName}
              className={'flex-1'}
            />
            <FormControl
              label={'Last Name'}
              id={'lastName'}
              type={'text'}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={formik.errors.lastName}
              className={'flex-1'}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
