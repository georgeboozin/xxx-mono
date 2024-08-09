import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '@/core/abstracts/generic-repository.abstract';
import { StripeAPIService } from './stripe-api.service';
import { ConnectedAccount } from '@/core/entites/connected-account.entity';

@Injectable()
export class ConnectedAccountRepository
  implements IGenericRepository<ConnectedAccount>
{
  constructor(private stripe: StripeAPIService) {}

  async getAll(): Promise<ConnectedAccount[]> {
    const result = await this.stripe.getAllConnectedAccounts();
    const connectedAccounts = result.map(({ id, business_profile }) => ({
      id,
      name: business_profile.name,
    }));

    return connectedAccounts;
  }

  async get(id: string): Promise<ConnectedAccount> {
    const connectedAccount = await this.stripe.getConnectedAccount(id);

    return {
      id: connectedAccount.id,
      name: connectedAccount.business_profile?.name,
    };
  }
}
