export const AVATAR_ACCEPT = 'image/png,image/jpeg';

const ALLOWED_AVATAR_TYPES = ['image/png', 'image/jpeg'];

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

export const validateAvatarFile = (file: File): string | null => {
  if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
    return 'Аватар должен быть изображением PNG или JPG';
  }

  if (file.size === 0) {
    return 'Файл аватара пуст';
  }

  if (file.size > MAX_AVATAR_BYTES) {
    return 'Размер аватара не должен превышать 5 МБ';
  }

  return null;
};
