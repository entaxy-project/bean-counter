import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@mdi/react'
import DeleteIcon from '@material-ui/icons/Delete'
import { mdiImport } from '@mdi/js'
import InputBase from '@material-ui/core/InputBase'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import { fade } from '@material-ui/core/styles/colorManipulator'
import confirm from '../../../util/confirm'
import TableToolbar from '../../../common/TableToolbar'
import LinkTo from '../../../common/LinkTo'

const styles = (theme) => ({
  importButton: {
    fill: theme.palette.text.secondary
  },
  buttons: {
    display: 'flex'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: fade(theme.palette.grey[400], 0.15),
    marginRight: theme.spacing(4),
    '&:hover': {
      backgroundColor: fade(theme.palette.grey[400], 0.25)
    }
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: 240
    }
  },
  smallIcon: {
    fontSize: 16
  },
  iconSpacer: {
    width: theme.spacing(3)
  }
})

export class TransactionsToolbarComponent extends React.Component {
  onDelete = () => {
    confirm('Delete selected transactions?', 'Are you sure?').then(() => {
      this.props.handleDelete(this.props.selectedTransactions)
      this.props.resetSelection()
    })
  }

  onChangeSearch = ({ target: { value } }) => {
    const { filterProps } = this.props
    if (value !== '') {
      filterProps.setFilter({
        attr: 'description',
        value: value.toLowerCase()
      })
    } else {
      filterProps.unsetFilter({ attr: 'description' })
    }
  }

  render() {
    const {
      classes,
      account,
      handleNew,
      selectedTransactions,
      filterProps
    } = this.props

    return (
      <TableToolbar
        title={`${account.institution} - ${account.name}`}
        subTitle={account.currency}
        selectedItems={selectedTransactions}
      >
        {selectedTransactions.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={this.onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <div className={classes.buttons}>
            <div>
              <InputBase
                type="input"
                placeholder="Search transactions"
                onChange={this.onChangeSearch}
                value={filterProps.filters.description || ''}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                endAdornment={(
                  <InputAdornment position="end">
                    {filterProps.filters.description && (
                      <IconButton
                        size="small"
                        disableFocusRipple
                        aria-label="Clear search"
                        onClick={() => this.onChangeSearch({ target: { name: 'description', value: '' } })}
                      >
                        <CloseIcon className={classes.smallIcon} />
                      </IconButton>
                    )}
                    {!filterProps.filters.description && (<div className={classes.iconSpacer} />)}
                  </InputAdornment>
                )}
              />
            </div>
            <Tooltip title="Import transaction">
              <IconButton
                aria-label="Import transaction"
                component={LinkTo(`/accounts/${account.id}/import`)}
              >
                <Icon
                  path={mdiImport}
                  size={1}
                  className={classes.importButton}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="New transaction">
              <IconButton aria-label="New transaction" onClick={handleNew}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </TableToolbar>
    )
  }
}

TransactionsToolbarComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  handleNew: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  selectedTransactions: PropTypes.array.isRequired,
  resetSelection: PropTypes.func.isRequired,
  filterProps: PropTypes.object.isRequired
}

export default withStyles(styles)(withRouter(TransactionsToolbarComponent))
