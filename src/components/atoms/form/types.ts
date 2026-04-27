// Re-exportamos los tipos que nuestros features podrían necesitar.
import { FormInstance as AntFormInstance } from 'antd';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';

export type FormInstance<T> = AntFormInstance<T>;
export {ValidateErrorEntity} 