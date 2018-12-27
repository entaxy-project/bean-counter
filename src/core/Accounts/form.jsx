import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import red from '@material-ui/core/colors/red'
import AutoComplete from '../../common/AutoComplete'
import { sortedInstitutionsForAutoselect } from '../../store/accounts/selectors'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    width: '80%'
  },
  input: {
    margin: theme.spacing.unit * 2
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: 10
  },
  deleteButton: {
    color: red[500],
    margin: theme.spacing.unit * 2
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.accounts.find(acc => acc.id === ownProps.accountId),
    institutions: sortedInstitutionsForAutoselect()
  }
}

export const AccountFormComponent = ({
  classes,
  institutions,
  handleSubmit,
  values,
  handleChange,
  setFieldValue,
  handleDelete,
  handleCancel
}) => (
  <Grid container direction="row" justify="center">
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Account name"
          inputProps={{
            'aria-label': 'Account name',
            required: true,
            maxLength: 100
          }}
          className={classes.input}
          value={values.name}
          name="name"
          onChange={handleChange}
          autoFocus
        />
        <AutoComplete
          label="Institution"
          name="institution"
          value={values.institution}
          options={institutions}
          onChange={setFieldValue}
          className={classes.input}
        />
        {handleDelete &&
          <Button
            size="small"
            onClick={handleDelete}
            className={classes.deleteButton}
          >
            Delete this account
          </Button>
        }
        <Divider />
        <div className={classes.formActions}>
          <Button type="submit" color="primary">Save</Button>
          <Button onClick={handleCancel} color="secondary">Cancel</Button>
        </div>
      </form>
    </Paper>
  </Grid>
)

AccountFormComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  institutions: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  handleCancel: PropTypes.func.isRequired
}

AccountFormComponent.defaultProps = {
  handleDelete: null
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ account }) => {
      if (account === undefined) {
        return {
          institution: null,
          name: ''
        }
      }
      return {
        ...account,
        institution: { label: account.institution, value: account.institution }
      }
    },
    handleSubmit: (values, { props, setSubmitting, resetForm }) => {
      setSubmitting(true)
      props.handleSave({ ...values, institution: values.institution.value })
      resetForm()
      setSubmitting(false)
    }
  })
)(AccountFormComponent)