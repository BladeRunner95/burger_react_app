import React from 'react';
import useHttpError from '../../hooks/http-error';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary';

const withErrorHandling = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpError(axios);

return (
    <Aux>
        <Modal
            show={error}
            modalClosed={clearError}>
            {error ? error.message : null}
            Something didn't work!
        </Modal>
        <WrappedComponent {...props}/>
    </Aux>
)
}
}
;

export default withErrorHandling;