'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
    { name: 'TBT 통관 분석', href: '/' },
    { name: '문서 자동화', href: '/autofix' },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function TopNavbar() {
    const pathname = usePathname();

    return (
        <Disclosure as="nav" className="w-full bg-white shadow-sm font-PretendardRegular">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/" className="text-xl font-bold text-indigo-600">
                                        UNTBT
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-8 sm:flex sm:items-center sm:space-x-1">
                                    {navigation.map(item => {
                                        const isCurrent = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    isCurrent
                                                        ? 'bg-indigo-50 text-indigo-600'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                                )}
                                                aria-current={isCurrent ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-1 px-4 pb-3 pt-2">
                            {navigation.map(item => {
                                const isCurrent = pathname === item.href;
                                return (
                                    <DisclosureButton
                                        key={item.name}
                                        as={Link}
                                        href={item.href}
                                        className={classNames(
                                            isCurrent
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'block rounded-md px-3 py-2 text-base font-medium transition-colors',
                                        )}
                                        aria-current={isCurrent ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                );
                            })}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
