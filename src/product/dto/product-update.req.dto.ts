import { PartialType } from '@nestjs/mapped-types';
import { ProductReqDto } from './product.req.dto';

// PartialType 을 통해 모든 프로퍼티를 선택적으로 만들면서 class-validator 와 class-transformer 를 유지한다.
// PartialType 이 생성하는 새로운 클래스 타입에서 기존 클래스와 각 프로퍼티들을 선택적으로 만든다.
export class ProductUpdateReqDto extends PartialType(ProductReqDto) {}
