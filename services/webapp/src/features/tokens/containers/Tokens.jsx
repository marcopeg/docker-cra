/* eslint react/prefer-stateless-function: off, no-nested-ternary: off */

import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'

import { Divider } from 'antd'

import Page from 'layouts/Page'
import PageSection from 'layouts/Page/Section'
import PageText from 'layouts/Page/Text'

import Input from 'components/Input'
import Button from 'components/Button'
import List from 'components/List'

import { generateToken, deleteToken } from '../services/tokens-service'
import ValidToken from '../components/ValidToken'
import InvalidToken from '../components/InvalidToken'

const state2props = ({ tokens }) => ({ ...tokens })

const dispatch2props = {
    generateToken,
    deleteToken,
}

class Tokens extends React.Component {
    static propTypes = {
        generateToken: PropTypes.func.isRequired,
        deleteToken: PropTypes.func.isRequired,
        valid: PropTypes.arrayOf(PropTypes.shape({
            token: PropTypes.string.isRequired,
            issuedOn: PropTypes.string.isRequired,
            expiresIn: PropTypes.string.isRequired,
            payload: PropTypes.shape({
                grant: PropTypes.arrayOf(PropTypes.string).isRequired,
                uname: PropTypes.string.isRequired,
                version: PropTypes.string.isRequired,
            }).isRequired,
        })),
        invalid: PropTypes.arrayOf(PropTypes.shape({
            token: PropTypes.string.isRequired,
            issuedOn: PropTypes.string.isRequired,
            expiresIn: PropTypes.string.isRequired,
        })),
    }

    static defaultProps = {
        valid: null,
        invalid: null,
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        evt.stopPropagation()

        try {
            this.props.generateToken({
                grant: JSON.parse(evt.target.elements.grant.value),
                expiresIn: evt.target.elements.duration.value,
            })
        } catch (err) {
            alert(err.message) // eslint-disable-line
        }
    }

    renderValidTokens () {
        const { valid: tokens } = this.props
        if (!tokens) {
            return null
        }
        return (
            <PageSection title="My Tokens">
                {tokens.length ? (
                    <List
                        items={tokens.map(item => ({ ...item, key: item.token }))}
                        renderItem={item => <ValidToken {...item} />}
                        onDisclose={this.props.deleteToken}
                    />
                ) : (
                    <div>no tokens</div>
                )}
            </PageSection>
        )
    }

    renderInvalidTokens () {
        const { invalid: tokens } = this.props
        if (!tokens) {
            return null
        }
        return (
            <PageSection title="Expired Tokens">
                {tokens.length ? (
                    <List
                        items={tokens.map(item => ({ ...item, key: item.token }))}
                        renderItem={item => <InvalidToken {...item} />}
                        onDisclose={this.props.deleteToken}
                    />
                ) : (
                    <div>no tokens</div>
                )}
            </PageSection>
        )
    }

    render () {
        return (
            <Page>
                {this.renderValidTokens()}
                {this.renderInvalidTokens()}
                <Divider dashed />
                <form onSubmit={this.onSubmit}>
                    <PageSection title="Create New Token">
                        <div style={{ marginBottom: 20, marginTop: 10, marginLeft: 10 }}>
                            <PageText>
                                A token gives access to the API on your behalf to 3rd parties.<br />
                                Use it carefully!
                            </PageText>
                        </div>
                        <div>
                            <Input
                                name="duration"
                                placeholder="1y"
                                size={5}
                            />
                            {' '}
                            <Input
                                name="grant"
                                placeholder={'["*"]'}
                                size={50}
                            />
                        </div>
                        <div>
                            <Button type="submit">Generate Token</Button>
                        </div>
                    </PageSection>
                </form>
            </Page>
        )
    }
}

const StyledTokens = radium(Tokens)

export default connect(state2props, dispatch2props)(StyledTokens)
