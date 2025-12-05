'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function createLead(data: {
    name: string;
    email: string;
    phone: string;
    service?: string;
    location?: string;
    message?: string;
    source: string;
    details?: any;
}) {
    try {
        const lead = await prisma.lead.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                service: data.service,
                location: data.location,
                message: data.message,
                source: data.source,
                details: data.details ? JSON.stringify(data.details) : undefined,
            },
        });
        return { success: true, lead };
    } catch (error) {
        console.error('Error creating lead:', error);
        return { success: false, error: 'Failed to create lead' };
    }
}

export async function getLeads() {
    const session = await auth();
    if (!session) {
        return { success: false, error: 'Unauthorized', leads: [] };
    }

    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return { success: true, leads };
    } catch (error) {
        console.error('Error fetching leads:', error);
        return { success: false, error: 'Failed to fetch leads', leads: [] };
    }
}

export async function updateLeadStatus(id: string, status: string) {
    const session = await auth();
    if (!session) {
        throw new Error('Unauthorized');
    }

    try {
        await prisma.lead.update({
            where: { id },
            data: { status },
        });
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Error updating lead status:', error);
        return { success: false, error: 'Failed to update lead status' };
    }
}
