/* eslint-disable prettier/prettier */

import { Entity, Property } from "@mikro-orm/core";
import { Field, ID } from "@nestjs/graphql";
import { PrimaryKeyUuid } from "src/decorators/PrimaryKeyUuid.decorator";



@Entity()
export class File {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  filename!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  mimetype!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  encoding!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  path!: string;
}