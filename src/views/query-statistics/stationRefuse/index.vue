<!--
 * @Author: chiyifan chiyf@stpass.com
 * @Date: 2024-03-09 15:56:23
 * @LastEditors: chiyifan chiyf@stpass.com
 * @LastEditTime: 2024-03-10 15:52:28
 * @FilePath: \psms-fe\src\views\query-statistics\stationRefuse\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #donorNo="{ record }">
        <div class="z-999">
          <a-button type="link" @click="clickDonorNo(record)">
            {{ record?.donorNo }}
          </a-button>
        </div>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { onMounted, watchEffect } from 'vue';
  import { useRouter } from 'vue-router';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { useStation } from '@/hooks/common/useStation';
  import { getStationRefuseList } from '@/api/query-statistics/stationRefuse.js';

  const router = useRouter();
  defineOptions({ name: 'StationRefuse' });

  const [registerTable, { getForm }] = useTable({
    api: getStationRefuseList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : ''; // 时间格式只要日期
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
  });

  const { stationOptions } = useStation();
  onMounted(async () => {
    watchEffect(async () => {
      await getForm().updateSchema({
        field: 'stationNo',
        componentProps: {
          options: stationOptions.value,
        },
      });
    });
  });

  function clickDonorNo(record) {
    router.push({ path: '/search/donor', query: { donorNo: record.donorNo } });
  }
</script>
