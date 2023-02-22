'use client';
import Select from 'react-select';
import useSWR from 'swr';

async function fetchModel() {
  const res = await fetch('/api/getEngines');
  return res.json();
}
export default function ModelSelection() {
  const { data: models, isLoading } = useSWR('models', fetchModel);
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  });

  return (
    <Select
      options={models?.modelOptions}
      defaultValue={model}
      placeholder={model}
      onChange={e => setModel(e.value)}
      className="mt-2"
      isSearchable
      isLoading={isLoading}
      menuPosition="fixed"
      classNames={{
        control: () => 'bg-selectionBackground border-selectionBackground',
      }}
    />
  );
}
