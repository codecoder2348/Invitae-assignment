import pandas as pd
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from typing import Dict, Set, Union


def tsv_reader() -> pd.DataFrame:
	gene_info = pd.read_csv('../data/variants.tsv', delimiter='\t', encoding='utf-8').fillna(method='ffill')
	gene2 = pd.DataFrame({"list_data":gene_info.groupby("Protein Change")["Nucleotide Change"].apply(list)}).reset_index().drop_duplicates(subset=['Protein Change'])
	result = pd.merge(gene_info, gene2, on='Protein Change', how='inner').drop(['Nucleotide Change'], axis=1)\
		.drop_duplicates(subset=['Gene', 'Protein Change']).rename(columns={'list_data': 'Nucleotide Change'})
	return result


def get_gene_data(gene_info: pd.DataFrame, search_text: str) -> Dict[str, Union[float, str]]:
	gene_dict: Dict = gene_info[gene_info['Gene'] == search_text].fillna('').to_dict(orient='records')

	return gene_dict


def get_gene_suggestion(gene_info: pd.DataFrame, search_text: str) -> Set[str]:
	gene_set: Set = set(gene_info[gene_info['Gene'].str.contains(search_text)]['Gene'])
	return gene_set


gene_df: pd.DataFrame = tsv_reader()


class GeneSearch(RetrieveAPIView):
	authentication_classes = ()
	permission_classes = (AllowAny,)

	def get(self, request, *args, **kwargs) -> Response:
		text: str = request.query_params.get('search_text').strip().upper()
		return Response({"result": get_gene_data(gene_df, text)}, status=status.HTTP_200_OK)


class GeneSuggest(RetrieveAPIView):
	authentication_classes = ()
	permission_classes = (AllowAny,)

	def get(self, request, *args, **kwargs) -> Response:
		text: str = request.query_params.get('search_text').strip().upper()
		return Response({"result": get_gene_suggestion(gene_df, text)}, status=status.HTTP_200_OK)
