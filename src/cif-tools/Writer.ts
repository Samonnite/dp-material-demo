/*
 * Copyright (c) 2016 - now David Sehnal, licensed under MIT License, See LICENSE file for more info.
 */

import { ValuePresence } from "./Dictionary"
import {Encoder} from './Binary/Encoder'

export interface FieldDesc<Data> {
    name: string,
    string?: (data: Data, i: number) => string | null,
    number?: (data: Data, i: number) => number,
    typedArray?: any,
    encoder?: Encoder,
    presence?: (data: Data, i: number) => ValuePresence
}

export interface CategoryDesc<Data> {
    name: string,
    fields: FieldDesc<Data>[]
}

export type CategoryInstance<Data> = { data: any, count: number, desc: CategoryDesc<Data> }
export type CategoryProvider = (ctx: any) => CategoryInstance<any> | undefined

export type OutputStream = { writeString: (data: string) => boolean, writeBinary: (data: Uint8Array) => boolean }

export interface Writer<Context> {
    startDataBlock(header: string): void,
    writeCategory(category: CategoryProvider, contexts?: Context[]): void,
    encode(): void,
    flush(stream: OutputStream): void
}