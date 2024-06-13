import React, { Component } from 'react'
import Select from 'react-select';
import Async from 'react-select/async';
export class ReactSelect extends Component {

    state = {
        selectedOption: null,
        options: [],
        selectedOptions: [],
        copyOption: [],
        loading: false,
    }



    componentDidMount() {
        this.getSelectedValue(this.props)
    }

    componentWillReceiveProps(props) {
        this.getSelectedValue(props)
    }

    getSelectedValue = ({ options, value: selectedvalue, }) => {
        let selectedOption

        if (Array.isArray(selectedvalue)) {

            selectedOption = options.filter(({ value }) => selectedvalue.some(id => id == value))

        } else {

            selectedOption = options.filter(({ value }) => value == selectedvalue)
        }

        this.setState({
            selectedOption,
            copyOption: options,
            options
        })

    }

    handleInput = (keyName, data, d) => {

        if (Array.isArray(data)) {

            data = data.map(({ value }) => value)

        } else {
            data = data ? data.value : data
        }

        this.props.handleChange(keyName, data)

    }

    render() {

        let {
            className = "",
            placeholder = 'Select',
            handleChange = '',
            isMulti = false,
            isSearchable = true,
            keyName = '',
            asyncVariable = '',
            disabled = false
        } = this.props

        let { selectedOption, options, selectedOptions, inputValue, loading } = this.state

        return (
            !asyncVariable ? <Select
                value={selectedOption}
                onChange={data => this.handleInput(keyName, data)}
                options={options}
                className={className}
                isMulti={isMulti}
                isSearchable={isSearchable}
                placeholder={placeholder}
                isDisabled={disabled}
            /> :
                <div ref="input">
                    <Async
                        value={selectedOption}
                        onChange={data => this.handleInput(keyName, data)}
                        className={className}
                        isMulti={isMulti}
                        options={options}
                        isLoading={loading}
                        defaultOptions
                        maxMenuHeight={220}
                        menuPlacement="auto"
                        loadOptions={this.handleAPI}
                        defaultOptions={options.concat(selectedOptions)}
                        isSearchable={isSearchable}
                        placeholder={placeholder}
                        isDisabled={disabled}
                    />
                </div>
        )

    }
}
