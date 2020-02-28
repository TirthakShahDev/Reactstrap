import React from 'react';

interface initialState {
    hasError: boolean;
}
export class ErrorHook extends React.PureComponent<{}, initialState> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        // Log errros from Services or store in State etc..
        console.error(error);
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {}

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
