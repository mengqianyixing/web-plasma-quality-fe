<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #plasmaUnqualifiedReason="{ record }">
        {{ formatReason(record?.plasmaUnqualifiedReason) }}
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './plasma.data';

  import { PageWrapper } from '@/components/Page';
  import { getPlasmaQueryList } from '@/api/query-statistics/plasma';
  import { onMounted, ref } from 'vue';
  import {
    DictionaryItemKeyEnum,
    DictionaryReasonEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';

  defineOptions({ name: 'PlasmaQuery' });

  const plasmaUnqualifiedDictionary = ref<Recordable[] | undefined>([]);
  onMounted(async () => {
    plasmaUnqualifiedDictionary.value = await getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason,
      dictItemTypes: [
        DictionaryItemKeyEnum.PlasmaFailed,
        DictionaryItemKeyEnum.Track,
        DictionaryItemKeyEnum.Test,
        DictionaryItemKeyEnum.Quarantine,
        DictionaryItemKeyEnum.Sample,
        DictionaryItemKeyEnum.Other,
      ],
    });

    await getForm().updateSchema({
      field: 'plasmaUnqualifiedReason',
      componentProps: {
        options: plasmaUnqualifiedDictionary.value.map((item) => {
          return {
            label: item.label,
            value: item.dictItemId,
          };
        }),
      },
    });
  });

  const [registerTable, { getForm }] = useTable({
    api: getPlasmaQueryList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      alwaysShowLines: 7,
      showAdvancedButton: true,
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
  });

  function formatReason(dictItemId: string) {
    return (
      plasmaUnqualifiedDictionary.value!.find((item) => item.dictItemId === dictItemId)?.label ?? ''
    );
  }
</script>
