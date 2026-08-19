/**
 * Apple Wallet & Google Wallet Pass Generator
 * Generates structured pass metadata, visual wallet card simulations,
 * and deep links for mobile wallets.
 */

export function generateApplePassJson(card) {
  const brandColor = card.theme?.accent || '#10b981';
  const bgColor = '#111827';
  const labelColor = '#9ca3af';
  const foregroundColor = '#ffffff';

  return {
    formatVersion: 1,
    passTypeIdentifier: 'pass.co.za.launchgremlin.card',
    serialNumber: `LG-CARD-${card.slug || 'USER'}-${Date.now()}`,
    teamIdentifier: 'LAUNCHGREMLIN_ZA',
    organizationName: card.companyName || 'LaunchGremlin',
    description: `${card.fullName} · Digital Business Card`,
    logoText: card.companyName || 'LaunchGremlin',
    foregroundColor: 'rgb(255, 255, 255)',
    backgroundColor: 'rgb(17, 24, 39)',
    labelColor: 'rgb(156, 163, 175)',
    generic: {
      primaryFields: [
        {
          key: 'name',
          label: 'MEMBER',
          value: card.fullName || 'Professional'
        }
      ],
      secondaryFields: [
        {
          key: 'title',
          label: 'TITLE',
          value: card.jobTitle || 'Business Professional'
        },
        {
          key: 'company',
          label: 'COMPANY',
          value: card.companyName || 'LaunchGremlin'
        }
      ],
      auxiliaryFields: [
        {
          key: 'phone',
          label: 'DIRECT CELL',
          value: card.phone || '+27 82 000 0000'
        },
        {
          key: 'whatsapp',
          label: 'WHATSAPP',
          value: card.whatsapp || card.phone || 'Available'
        }
      ],
      backFields: [
        {
          key: 'email',
          label: 'EMAIL ADDRESS',
          value: card.email || 'hello@launchgremlin.co.za'
        },
        {
          key: 'website',
          label: 'WEBSITE',
          value: card.website || 'https://launchgremlin.co.za'
        },
        {
          key: 'bio',
          label: 'ABOUT',
          value: card.bio || 'Digital Business Card powered by LaunchGremlin.'
        },
        {
          key: 'cardUrl',
          label: 'LIVE DIGITAL CARD',
          value: `https://launchgremlin.co.za/c/${card.slug || 'card'}`
        }
      ]
    },
    barcode: {
      message: `https://launchgremlin.co.za/c/${card.slug || 'card'}`,
      format: 'PKBarcodeFormatQR',
      messageEncoding: 'iso-8859-1'
    }
  };
}

export function downloadPassJsonFile(card) {
  const passData = generateApplePassJson(card);
  const blob = new Blob([JSON.stringify(passData, null, 2)], {
    type: 'application/json;charset=utf-8;'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${card.slug || 'business_card'}_wallet_pass.json`;
  link.click();
}
