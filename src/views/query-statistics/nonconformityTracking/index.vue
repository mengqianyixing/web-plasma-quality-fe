<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <!-- <template #toolbar>
        <a-button type="primary" @click="print">打印报表</a-button>
      </template> -->
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '追踪记录/报告',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { columns, searchFormSchema } from './nonconformityTracking.data';
  import { PageWrapper } from '@/components/Page';
  import {
    getNonconformityTrackingList,
    getBlockSource,
  } from '@/api/query-statistics/nonconformityTracking';
  import { getReportApi } from '@/api/report';
  import { message } from 'ant-design-vue';
  import { reactive } from 'vue';

  defineOptions({ name: 'NonconformityTracking' });
  const reportKey = reactive({});
  const [registerTable] = useTable({
    api: getNonconformityTrackingList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    afterFetch: async (res) => {
      const enumBlock = {};
      try {
        const data = await getBlockSource();
        data[0].enumObjList.forEach((x) => {
          enumBlock[x['key']] = x['show'];
          if (x.show === '浆站') {
            reportKey[x.show] = 'PLASMA_TRACK';
          } else {
            reportKey[x.show] = 'FACTORY_TRACK';
          }
        });
      } catch (e) {
        console.log(e);
      }

      return res?.map((_) => ({
        ..._,
        collectAt: _.collectAt ? _.collectAt.slice(0, 10) : _.collectAt,
        blockAt: _.blockAt ? _.blockAt.slice(0, 10) : _.blockAt,
        blockBy: enumBlock[_.blockBy] || _.blockBy,
      }));
    },
  });
  async function handleEdit(record: Recordable) {
    const res = await getReportApi({
      reportKey: reportKey[record['blockBy']],
      contentKey: record.dbId,
    });
    if (res.type === 'application/json') {
      res.text().then((a) => {
        message.warning(JSON.parse(a).msg);
      });
      return;
    }
    const blobURL = window.URL.createObjectURL(res);
    window.open(blobURL);
  }
</script>
