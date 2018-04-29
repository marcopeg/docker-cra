import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import getStyles from './List.style'
const styles = getStyles()

const makeDiscloseHandler = (onDisclose, item) => {
    if (!onDisclose) {
        return null
    }
    return evt => onDisclose(item, evt)
}

const makeItemStyle = (item, props) => {
    const style = [
        styles.item,
        props.isLast ? styles.item.last : styles.item.normal,
        props.onDisclose ? styles.item.clickable : null,
        item.active ? styles.item.active : null,
        item.disabled ? styles.item.disabled : null,
        props.itemStyle,
    ]

    return style
}

const List = ({
    items,
    style,
    itemStyle,
    renderItem,
    onDisclose,
}) => (
    <div
        style={[ styles.wrapper, style ]}
    >
        {items.map((item, idx) => (
            <div
                key={item.key}
                onClick={makeDiscloseHandler(onDisclose, item)}
                style={makeItemStyle(item, {
                    itemStyle,
                    onDisclose,
                    isFirst: idx === 0,
                    isLast: idx === (items.length - 1),
                })}
            >
                {renderItem(item)}
            </div>
        ))}
    </div>
)

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
    })).isRequired,
    style: PropTypes.object,
    itemStyle: PropTypes.object,
    renderItem: PropTypes.func,
    onDisclose: PropTypes.func,
}

List.defaultProps = {
    style: {},
    itemStyle: {},
    renderItem: item => JSON.stringify(item),
    onDisclose: null,
}

const StyledList = radium(List)

export default StyledList
