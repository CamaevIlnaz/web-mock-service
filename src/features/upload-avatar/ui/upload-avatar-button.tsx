import { Button, Flex, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Upload } from 'lucide-react';
import { useRef, type ChangeEvent } from 'react';

import { AVATAR_ACCEPT } from '../lib';
import { uploadAvatarModel } from '../model';

export function UploadAvatarButton() {
  const [isUploading, selectFile] = useUnit([
    uploadAvatarModel.$isUploading,
    uploadAvatarModel.fileSelected,
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (file) {
      selectFile(file);
    }
  };

  return (
    <Flex direction="column" align="flex-start" gap="2">
      <input
        ref={inputRef}
        type="file"
        accept={AVATAR_ACCEPT}
        hidden
        onChange={handleChange}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        borderColor="brand"
        color="brand"
        fontWeight="medium"
        borderRadius="md"
        gap="2"
        loading={isUploading}
        _hover={{ bg: 'brandSoft' }}
        onClick={() => inputRef.current?.click()}
      >
        <Upload size={16} strokeWidth={1.75} />
        Изменить аватар
      </Button>
      <Text fontSize="xs" color="muted">
        PNG или JPG, до 5 МБ
      </Text>
    </Flex>
  );
}
