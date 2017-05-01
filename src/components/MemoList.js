import React, { Component } from 'react';
import { Memo } from './index';
import PropTypes from 'prop-types';

class MemoList extends Component {
    render() {
        const mapToComponents = data => {
            return data.map((memo, i) => {
                return (<Memo 
                            data={memo}
                            ownership={ (memo.account_id === this.props.currentUserId) }
                            key={ memo.id }
                />);
            });
        };

        return (
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

MemoList.propTypes = {
    data: PropTypes.array,
    currentUserId: PropTypes.number
};

MemoList.defaultProps = {
    data: [],
    currentUserId: ''
};


export default MemoList;