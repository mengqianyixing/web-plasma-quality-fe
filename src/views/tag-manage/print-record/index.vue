<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #labelType="{ record }">
        {{ formatLabelType(record?.labelType) }}
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';

  import { ref, onMounted } from 'vue';
  import { columns, searchFormSchema } from './record.data';
  import { getPrintRecords } from '@/api/tag/printRecord';
  import { getTagDictionary } from '@/api/tag/encoding';
  import { TagDictionaryType } from '@/enums/dictionaryEnum';

  defineOptions({ name: 'TagPrintRecord' });

  const searchInfo = ref<Recordable>({});
  const labelTypeDictionary = ref<Recordable[] | undefined>([]);
  const printReasonDictionary = ref<Recordable[] | undefined>([]);

  onMounted(async () => {
    const dictionaryArr = await getTagDictionary([
      TagDictionaryType.LabelType,
      TagDictionaryType.PrintReason,
    ]);
    if (!dictionaryArr.length) return;
    labelTypeDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === TagDictionaryType.LabelType,
    )?.dictImtes;
    printReasonDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === TagDictionaryType.PrintReason,
    )?.dictImtes;
    await getForm().updateSchema({
      field: 'labelType',
      componentProps: {
        options: labelTypeDictionary.value,
      },
    });
  });

  const [registerTable, { getForm }] = useTable({
    api: getPrintRecords,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: true,
    rowKey: 'prtNo',
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
  });

  function formatLabelType(labelType: string) {
    return labelTypeDictionary.value!.find((it) => it.value === labelType)?.label ?? labelType;
  }
</script>
