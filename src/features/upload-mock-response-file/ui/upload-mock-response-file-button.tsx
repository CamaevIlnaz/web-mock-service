import { Button, chakra } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Upload } from 'lucide-react';
import { useRef } from 'react';

import { ACCEPTED_FILE_TYPES, uploadMockResponseFileModel } from '../model';

interface UploadMockResponseFileButtonProps {
  mockServerId: number | null;
}

export const UploadMockResponseFileButton = ({
  mockServerId,
}: UploadMockResponseFileButtonProps) => {
  const [isUploading, chooseFile] = useUnit([
    uploadMockResponseFileModel.$isUploading,
    uploadMockResponseFileModel.fileChosen,
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <chakra.input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_FILE_TYPES}
        display="none"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = '';

          if (file && mockServerId !== null) {
            chooseFile({ mockServerId, file });
          }
        }}
      />
      <Button
        bg="primary"
        color="primaryText"
        size="md"
        borderRadius="md"
        fontWeight="medium"
        px="4"
        gap="2"
        cursor="pointer"
        disabled={mockServerId === null}
        loading={isUploading}
        _hover={{ opacity: 0.9 }}
        onClick={() => inputRef.current?.click()}
      >
        <Upload size={18} strokeWidth={2} />
        Загрузить файл
      </Button>
    </>
  );
};
