import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Todos.css';
import { PAGE_SIZE } from '../../constants';
import TodosModal from './TodosModal';


function Todos({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'todos/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/todos',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    dispatch({
      type: 'todos/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'todos/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
      render: val => (val ? 'Closed' : 'Open'),
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <TodosModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </TodosModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
      <div className={styles.create}>
          <TodosModal record={{}} onOk={createHandler}>
            <Button type="primary">Create Todo</Button>
          </TodosModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.todos;
  return {
    loading: state.loading.models.todos,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Todos);
