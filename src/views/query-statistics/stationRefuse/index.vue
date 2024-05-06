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
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleExport"
          :loading="loading"
          v-auth="QuarantineButtonEnum.StationRefuseExport"
        >
          导出
        </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { onMounted, watchEffect, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { useStation } from '@/hooks/common/useStation';
  import { getStationRefuseList } from '@/api/query-statistics/stationRefuse.js';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { message } from 'ant-design-vue';
  import { QuarantineButtonEnum } from '@/enums/authCodeEnum';

  const { currentRoute } = useRouter();
  const globalApiStore = useGlobalApiStoreWithOut();
  const router = useRouter();

  defineOptions({ name: 'StationRefuse' });

  const [registerTable, { getForm }] = useTable({
    api: getStationRefuseList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      fieldMapToTime: [
        ['createAt', ['createAtBegin', 'createAtEnd'], 'YYYY-MM-DD'],
        ['blockAt', ['blockAtBegin', 'blockAtEnd'], 'YYYY-MM-DD'],
      ],
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
          options: stationOptions,
        },
      });
    });
  });

  function clickDonorNo(record) {
    router.push({ path: '/search/donor', query: { donorNo: record.donorNo } });
  }

  const loading = ref(false);
  async function handleExport() {
    loading.value = true;
    try {
      const { getFieldsValue } = getForm();
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
      const data = await getStationRefuseList({
        ...getFieldsValue(),
        currPage: 1,
        pageSize,
      } as any);
      if ((data.totalCount || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');

      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
      const { result, merge: bodyMerge } = formatData(
        lastLevelCols,
        data.result || [],
        rows.length,
      );
      jsonToSheetXlsx({
        data: [...rows, ...result],
        json2sheetOpts: { skipHeader: true },
        merges: [...headerMerge, ...bodyMerge],
        filename: currentRoute.value.meta.title + '.xlsx',
      });
    } finally {
      loading.value = false;
    }
  }
</script>
